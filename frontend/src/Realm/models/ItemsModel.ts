import Realm from 'realm';
import {ItemCategory, ItemLabel, ItemType} from 'src/API';

export enum ISchemas {
  Item = 'Item',
}

export type ItemProperties = {
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
  id!: string;
  title!: string;
  cover!: string;
  type!: string;
  createdAt!: Date;
  updatedAt!: Date;
  publishedAt!: Date;
  filePath!: string;
  watched!: boolean;
  category!: string;
  label!: string;

  static schema = {
    name: ISchemas.Item,
    properties: {
      id: 'string',
      title: 'string',
      cover: 'string',
      type: 'string',
      createdAt: 'date',
      updatedAt: 'date',
      publishedAt: 'date',
      filePath: 'string',
      watched: 'bool',
      category: 'string',
      label: 'string',
    },
    primaryKey: 'id',
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [Item],
};

