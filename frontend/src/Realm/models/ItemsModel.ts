import Realm from 'realm';
import {ItemCategory, ItemLabel, ItemType} from 'src/API';

export enum ISchemas {
  Item = 'Item',
}

export type ItemProperties = {
  _id?: Realm.BSON.ObjectId;
  id: string;
  title: string;
  cover: string;
  type: ItemType;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  filePath: string;
  watched: boolean;
  category: ItemCategory;
  label: ItemLabel;
};

class Item extends Realm.Object<Item> {
  _id!: Realm.BSON.ObjectId;
  id!: string;
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
      _id: 'objectId',
      id: 'string',
      title: 'string',
      cover: 'string',
      type: '{}',
      createdAt: 'date',
      updatedAt: 'date',
      publishedAt: 'date',
      filePath: 'string',
      watched: 'bool',
      category: '{}',
      label: '{}',
    },
    primaryKey: 'id',
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [Item],
};
