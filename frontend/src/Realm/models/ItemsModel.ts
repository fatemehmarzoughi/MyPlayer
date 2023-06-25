import Realm from 'realm';
import { ItemCategory, ItemLabel, ItemType } from 'src/API';

export enum ISchemas {
    Item = "Item"
}

class Item extends Realm.Object<Item> {
    id: string = '';
    title!: string;
    cover!: string;
    type!: ItemType;
    createdAt!: Date;
    updatedAt!: Date;
    publishedAt!: Date;
    filePath!: string;
    watched!: boolean;
    category!: ItemCategory;
    label!: ItemLabel;

  static schema = {
    name: ISchemas.Item,
    properties: {
      id: '',
    },
    primaryKey: 'Item_Primary_Key',
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [Item],
};
