/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import {Divider, HStack, Image, Spinner, Text, View, VStack} from "native-base";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {FlatList, TouchableOpacity} from "react-native";
import EvIcon from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import {connect, ConnectedProps} from "react-redux";
import {ItemType} from "src/API";
import {height, mainColor} from "src/assets";
import {contentColor, Header, PageWrapper} from "src/components";
import Context from "src/context/context";
import {Audio, Video} from "src/pages";
import {NetworkError} from "src/pages/Errors";
import {useRealmCRUD} from "src/Realm/hooks";
import {getItemDetails} from "src/Redux/actions";
import {ItemDetailsActions} from "src/Redux/reducers";

import {styles} from "./styles";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  id: number;
};

export type IAudioVideoRootMapState = {
  itemDetails: ItemDetailsActions;
};

export interface IAudioVideoRootProps extends IAudioVideoRootDispatchProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
  route: RouteProp<ParamListBase, "AVRoot">;
}

/* -------------------------------------------------------------------------- */
/*                               AudioVideoRoot                               */
/* -------------------------------------------------------------------------- */
const AudioVideoRoot: React.FC<IAudioVideoRootProps> = React.memo(
  ({
    route,
    navigation,
    itemDetails: itemDetailsProps,
    getItemDetails: getItemDetailsProps,
  }) => {
    /* -------------------------------------------------------------------------- */
    /*                                 Attributes                                 */
    /* -------------------------------------------------------------------------- */
    const isMounted = useRef<boolean>(true);
    const context = useContext(Context);
    const {loadingItemDetail, itemDetails, error} = itemDetailsProps;
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const {writeObject} = useRealmCRUD({});

    /* -------------------------------------------------------------------------- */
    /*                              Content Renderers                             */
    /* -------------------------------------------------------------------------- */

    const _render_tools = useMemo(() => {
      if (!itemDetails) return <NetworkError onReload={onRefresh} />;
      const {
        title,
        relatedItems,
        label,
        likes,
        category,
        cover,
        createdAt,
        filePath,
        publishedAt,
        type,
        watched,
        updatedAt,
      } = itemDetails.data.attributes;
      return (
        <VStack width={"100%"} marginTop={7}>
          <HStack justifyContent={"space-between"}>
            <Text color={mainColor} fontSize={"xs"}>
              {label}
            </Text>
            <HStack space={1}>
              <TouchableOpacity>
                <EvIcon
                  name="share-google"
                  style={contentColor(context.theme)}
                  size={32}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  writeObject({
                    name: "Item",
                    object: {
                      id: String(itemDetails.data.id),
                      type,
                      title,
                      cover,
                      label,
                      watched,
                      category,
                      filePath,
                      createdAt,
                      updatedAt,
                      publishedAt,
                    },
                  })
                }>
                <Icon
                  name="bookmark-outline"
                  style={contentColor(context.theme)}
                  size={22}
                />
              </TouchableOpacity>
            </HStack>
          </HStack>
          <Text
            width={"80%"}
            {...contentColor(context.theme)}
            fontSize={"2xl"}
            marginBottom={3}
            fontWeight="bold">
            {title}
          </Text>
          <HStack space={3}>
            <HStack alignItems={"center"} space={1}>
              <Icon
                name="heart"
                style={contentColor(context.theme)}
                size={12}
              />
              <Text {...contentColor(context.theme)} fontSize="xs">
                {likes} Likes
              </Text>
            </HStack>
            <HStack alignItems={"center"} space={1}>
              <Icon name="play" style={contentColor(context.theme)} size={12} />
              <Text {...contentColor(context.theme)} fontSize="xs">
                {relatedItems.data.length} Videos
              </Text>
            </HStack>
          </HStack>
        </VStack>
      );
    }, [itemDetails]);

    const _render_relatedItems = useMemo(() => {
      if (!itemDetails) return <NetworkError onReload={onRefresh} />;
      const {title, type, relatedItems} = itemDetails.data.attributes;
      return (
        <>
          <Text
            width="100%"
            marginTop={8}
            marginBottom={4}
            fontWeight={"bold"}
            color={mainColor}
            fontSize={"lg"}>
            Related {type}s
          </Text>

          <FlatList
            data={relatedItems.data}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => {
              const {
                title: relatedItemTitle,
                cover: relatedItemCover,
                watched: relatedItemWatched,
                likes: relatedItemLikes,
              } = item.attributes;
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("AVRoot", {id: item.id})
                    }>
                    <View style={styles.startPart}>
                      <Image
                        alt={title}
                        source={{uri: relatedItemCover}}
                        style={styles.coverImage}
                      />
                      <VStack width="60%" style={styles.titles}>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          {...contentColor(context.theme)}>
                          {relatedItemTitle}
                        </Text>
                        <HStack alignItems={"center"} space={1}>
                          <Icon
                            name="heart"
                            style={contentColor(context.theme)}
                            size={12}
                          />
                          <Text {...contentColor(context.theme)} fontSize="xs">
                            {relatedItemLikes} Likes
                          </Text>
                        </HStack>
                      </VStack>
                    </View>
                    {relatedItemWatched ? (
                      <Icon
                        name="checkmark-circle"
                        style={{color: "green"}}
                        size={32}
                      />
                    ) : (
                      <Icon
                        name="play-circle"
                        style={{color: mainColor}}
                        size={32}
                      />
                    )}
                  </TouchableOpacity>
                  <Divider height={0.45} />
                </View>
              );
            }}
          />
        </>
      );
    }, [itemDetails]);

    const _render_content = useMemo(() => {
      if (!itemDetails) return <NetworkError onReload={onRefresh} />;
      const {title, cover, type, filePath} = itemDetails.data.attributes;

      return (
        <PageWrapper customStyles={{height: height - 80}}>
          {/* /* --------------------------------- Header --------------------------------- */}
          <Header title={title} customClick={() => navigation.goBack()} />
          {/* /* ------------------------------- Player ------------------------------ */}
          {type === ItemType.Audio ? (
            <Audio cover={cover} filePath={filePath} />
          ) : (
            <Video cover={cover} filePath={filePath} />
          )}

          {/* /* ---------------------------------- Tools --------------------------------- */}
          {_render_tools}

          {/* /* ------------------------------ Related Items ----------------------------- */}
          {_render_relatedItems}
        </PageWrapper>
      );
    }, [itemDetails]);

    /* -------------------------------------------------------------------------- */
    /*                                  UseEffect                                 */
    /* -------------------------------------------------------------------------- */

    const onRefresh = useCallback(async () => {
      setRefreshing(true);

      const {id} = route.params as Props;
      await getItemDetailsProps({id});
      setRefreshing(false);
    }, [getItemDetailsProps, setRefreshing, route]);

    useEffect(() => {
      isMounted.current = false;
      const {id} = route.params as Props;
      getItemDetailsProps({id});

      return () => {
        isMounted.current = false;
      };
    }, [getItemDetailsProps, route.params]);

    /* -------------------------------------------------------------------------- */
    /*                                   Return                                   */
    /* -------------------------------------------------------------------------- */
    switch (true) {
      case loadingItemDetail || refreshing || isMounted.current:
        return (
          <Spinner
            size={"lg"}
            accessibilityLabel="Loading posts"
            color="warning.500"
            style={{
              alignSelf: "center",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        );
      case !!error:
        console.log(error);
        return <NetworkError onReload={onRefresh} />;

      default:
        return _render_content;
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                                    Redux                                   */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state: IAudioVideoRootMapState) => {
  return {
    itemDetails: state.itemDetails,
  };
};

const dispatchToProps = {
  getItemDetails,
};

const connector = connect(mapStateToProps, dispatchToProps);

export type IAudioVideoRootDispatchProps = ConnectedProps<typeof connector>;

export default connector(AudioVideoRoot);
