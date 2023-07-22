import Realm from 'realm';
import {ItemCategory, ItemLabel, ItemType} from 'src/API';

export enum ISchemas {
  Item = 'Item',
}

export type ItemProperties = {
  id: number;
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
  likes: number;
};

export class ItemRealm extends Realm.Object<ItemRealm> {
  id!: number;
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
  likes!: number;

  static schema = {
    name: ISchemas.Item,
    properties: {
      id: 'int',
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
      likes: 'int'
    },
    primaryKey: 'id',
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [ItemRealm],
};

