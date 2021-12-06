import React from "react";
import { View, TouchableOpacity, ScrollView, FlatList as FlatList2 } from 'react-native';
import MainHeader from "components/pagesHeader/MainHeader";
import Notification from "../../Notification/NotificationSetup";
import { changeBackgroundColor , changeColor} from "components/lightDarkTheme";
import context from "context/context";
import Animated , { useSharedValue, useAnimatedStyle,withSpring, withTiming ,withRepeat, Easing, FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import { styles } from './style';
import { Image, Heading, Text, VStack, FlatList } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'components/Modals/subCategoryModal';


function useHook(Component){
    return (props) => {
        const offset = useSharedValue(5);
    
        const animatedStyles = useAnimatedStyle(() => {
          return {

            transform: [{ translateX: offset.value }]

          }
        });
    
        return(
            <Component {...props} animatedStyles={animatedStyles} offset={offset} />
        )
    }
}

class Home extends React.Component{

    static contextType = context

    constructor(){
        super();
        this.state={
            data : [
                { 
                    id : '0',
                    name : 'All',
                    size : 8,
                    subCategory : [],
                },
                { 
                    id : '1',
                    name : 'Movies',
                    size : 1,
                    subCategory : [
                        { 
                            name : "All"
                        },
                        { 
                            name : "Horror"
                        },
                        { 
                            name : 'Iranian'
                        },
                        { 
                            name : 'Comedy'
                        }
                    ]
                },
                { 
                    id : '2',
                    name : 'Sports',
                    size : 1,
                    subCategory : [],
                },
                { 
                    id : '3',
                    name : 'Albums',
                    size : 1,
                    subCategory : [],
                },
                { 
                    id : '4',
                    name : 'Musics',
                    size : 1,
                    subCategory : [
                        { 
                            name : "All"
                        },
                        { 
                            name : "Happy"
                        },
                        { 
                            name : 'Sad'
                        },
                        { 
                            name : 'jazz'
                        }
                    ]
                },
                { 
                    id : '5',
                    name : 'Radio',
                    size : 1,
                    subCategory : [],
                },
            ],
            dotPosition : 25,
            showSubCategory : false,
            subCategoryTitle : '',
            subCategoryVisibility : false,
            selectedSubCategory : 'All', //selected subCategory
            selectedCategory : 0, //selected category
        }
    }

    notify = () => {
        Notification.scheduleNotification(new Date(Date.now() + (5*1000)));
    }

    componentDidMount(){
        this.props.offset.value = withRepeat(withTiming(0), 10000, true)
    }

    categoryPressed = (id) => {
        let categoryItems = [...this.state.data];
        categoryItems.map(item => item.size = 1);
        categoryItems[id].size = 8;
        console.log(`category pressed = ${categoryItems[id].subCategory.length !== 0}`)
        let showSubCategory = categoryItems[id].subCategory.length !== 0 ? true : false;
        this.setState({
            data : categoryItems,
            showSubCategory,
            subCategoryTitle : categoryItems[id].name,
            selectedCategory : id,
            selectedSubCategory : 'All'
        })
    }

    subCategoryOpenModal = () => {
        console.log('modal')
        this.setState({
            subCategoryVisibility : true,
        })
    }

    selectedSbCategory = (selectedSubCategory) => {
        this.setState({
            selectedSubCategory,
            subCategoryVisibility : false
        })
    }

    render(){
        return(
            <ScrollView>
                <MainHeader 
                  searchOnPress={() => this.props.navigation.navigate('Search') } 
                  menuOnPress={() => this.props.navigation.openDrawer()} 
                />

                <View style={styles.banner}>
                  <Image size="2xl" resizeMode="cover" alt="banner" style={styles.bannerImage} source={require('../../assets/Images/Windows-11.jpeg')} />
                  <View style={styles.bannerContent}>
                    <VStack space={2}>
                      <Text style={styles.texts} fontSize="lg">Audio/Video of the day</Text>
                      <Heading style={styles.texts} bold fontSize="2xl">The Item's Title</Heading>
                      <TouchableOpacity>
                        <VStack flexDirection='row'>
                          <Text style={styles.texts} fontSize="sm" italic>Watch Now</Text>
                          <Animated.View style={[this.props.animatedStyles ]}>
                             <Icon name="return-down-back-outline" style={[styles.icon]} />
                          </Animated.View>
                        </VStack>
                      </TouchableOpacity>
                    </VStack>
                  </View>
                </View>

                <FlatList 
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.data}
                  keyExtractor={(item) => item.id}
                  renderItem = {({item}) => (
                      <VStack alignItems="center">
                          <Text onPress={() => this.categoryPressed(item.id)} style={[styles.categoryName , changeColor(this.context.theme)]}>
                            {item.name}
                          </Text>
                          <Icon style={[changeColor(this.context.theme)]} size={item.size} name="ellipse" />
                      </VStack>
                  )} 
                />

                <>
                {this.state.showSubCategory ? (
                    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
                    <VStack flexDirection="row" style={styles.subCategory}>
                       <Text style={changeColor(this.context.theme)}>{this.state.subCategoryTitle} > </Text>
                       <TouchableOpacity 
                         onPress={() => this.subCategoryOpenModal()} 
                         style={[styles.selectSubCategory ]}
                        >
                          <VStack flexDirection="row" alignItems="center">
                            <Text>{this.state.selectedSubCategory} </Text>
                            <Icon name="chevron-down-outline" />
                          </VStack>
                       </TouchableOpacity>

                    </VStack>
                    </Animated.View>
                ) : (
                    <Text></Text>
                )}
                </>

                <Modal
                 subCategoryVisibility = {this.state.subCategoryVisibility}
                 data = {this.state.data[this.state.selectedCategory].subCategory}
                 selectedCategory = {this.state.selectedCategory}
                 selectedSbCategory = {this.selectedSbCategory}
                 />


                {/* <Text onPress={() => this.notify()}>Text notification</Text>
                <Text onPress={() => this.props.navigation.openDrawer()}>Text notification</Text> */}
            </ScrollView>
        )
    }
}

export default useHook(Home);