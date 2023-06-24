/* -------------------------------------------------------------------------- */
/*                                   General                                  */
/* -------------------------------------------------------------------------- */
export type Meta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type Attributes<T> = {
  id: number;
  attributes: T;
};

export type Data<T, D extends Attributes<T> | Attributes<T>[]> = {
  data: D;
  meta?: Meta;
};

export enum CountryCode {
  AF = 'AF',
  AL = 'AL',
  DZ = 'DZ',
  AS = 'AS',
  AD = 'AD',
  AO = 'AO',
  AI = 'AI',
  AQ = 'AQ',
  AG = 'AG',
  AR = 'AR',
  AM = 'AM',
  AW = 'AW',
  AU = 'AU',
  AT = 'AT',
  AZ = 'AZ',
  BS = 'BS',
  BH = 'BH',
  BD = 'BD',
  BB = 'BB',
  BY = 'BY',
  BE = 'BE',
  BZ = 'BZ',
  BJ = 'BJ',
  BM = 'BM',
  BT = 'BT',
  BO = 'BO',
  BA = 'BA',
  BW = 'BW',
  BV = 'BV',
  BR = 'BR',
  IO = 'IO',
  VG = 'VG',
  BN = 'BN',
  BG = 'BG',
  BF = 'BF',
  BI = 'BI',
  KH = 'KH',
  CM = 'CM',
  CA = 'CA',
  CV = 'CV',
  BQ = 'BQ',
  KY = 'KY',
  CF = 'CF',
  TD = 'TD',
  CL = 'CL',
  CN = 'CN',
  CX = 'CX',
  CC = 'CC',
  CO = 'CO',
  KM = 'KM',
  CK = 'CK',
  CR = 'CR',
  HR = 'HR',
  CU = 'CU',
  CW = 'CW',
  CY = 'CY',
  CZ = 'CZ',
  CD = 'CD',
  DK = 'DK',
  DJ = 'DJ',
  DM = 'DM',
  DO = 'DO',
  EC = 'EC',
  EG = 'EG',
  SV = 'SV',
  GQ = 'GQ',
  ER = 'ER',
  EE = 'EE',
  SZ = 'SZ',
  ET = 'ET',
  FK = 'FK',
  FO = 'FO',
  FJ = 'FJ',
  FI = 'FI',
  FR = 'FR',
  GF = 'GF',
  PF = 'PF',
  TF = 'TF',
  GA = 'GA',
  GM = 'GM',
  GE = 'GE',
  DE = 'DE',
  GH = 'GH',
  GI = 'GI',
  GR = 'GR',
  GL = 'GL',
  GD = 'GD',
  GP = 'GP',
  GU = 'GU',
  GT = 'GT',
  GG = 'GG',
  GN = 'GN',
  GW = 'GW',
  GY = 'GY',
  HT = 'HT',
  HM = 'HM',
  HN = 'HN',
  HU = 'HU',
  IS = 'IS',
  IN = 'IN',
  ID = 'ID',
  IR = 'IR',
  IQ = 'IQ',
  IE = 'IE',
  IM = 'IM',
  IL = 'IL',
  IT = 'IT',
  CI = 'CI',
  JM = 'JM',
  JP = 'JP',
  JE = 'JE',
  JO = 'JO',
  KZ = 'KZ',
  KE = 'KE',
  XK = 'XK',
  KW = 'KW',
  KG = 'KG',
  LA = 'LA',
  LV = 'LV',
  LB = 'LB',
  LS = 'LS',
  LR = 'LR',
  LY = 'LY',
  LI = 'LI',
  LT = 'LT',
  LU = 'LU',
  MO = 'MO',
  MK = 'MK',
  MG = 'MG',
  MW = 'MW',
  MY = 'MY',
  MV = 'MV',
  ML = 'ML',
  MT = 'MT',
  MH = 'MH',
  MQ = 'MQ',
  MR = 'MR',
  MU = 'MU',
  YT = 'YT',
  MX = 'MX',
  FM = 'FM',
  MD = 'MD',
  MC = 'MC',
  MN = 'MN',
  ME = 'ME',
  MS = 'MS',
  MA = 'MA',
  MZ = 'MZ',
  MM = 'MM',
  NA = 'NA',
  NR = 'NR',
  NP = 'NP',
  NL = 'NL',
  NC = 'NC',
  NZ = 'NZ',
  NI = 'NI',
  NE = 'NE',
  NG = 'NG',
  NU = 'NU',
  NF = 'NF',
  KP = 'KP',
  MP = 'MP',
  NO = 'NO',
  OM = 'OM',
  PK = 'PK',
  PW = 'PW',
  PS = 'PS',
  PA = 'PA',
  PG = 'PG',
  PY = 'PY',
  PE = 'PE',
  PH = 'PH',
  PN = 'PN',
  PL = 'PL',
  PT = 'PT',
  PR = 'PR',
  QA = 'QA',
  CG = 'CG',
  RO = 'RO',
  RU = 'RU',
  RW = 'RW',
  RE = 'RE',
  BL = 'BL',
  SH = 'SH',
  KN = 'KN',
  LC = 'LC',
  MF = 'MF',
  PM = 'PM',
  VC = 'VC',
  WS = 'WS',
  SM = 'SM',
  SA = 'SA',
  SN = 'SN',
  RS = 'RS',
  SC = 'SC',
  SL = 'SL',
  SG = 'SG',
  SX = 'SX',
  SK = 'SK',
  SI = 'SI',
  SB = 'SB',
  SO = 'SO',
  ZA = 'ZA',
  GS = 'GS',
  KR = 'KR',
  SS = 'SS',
  ES = 'ES',
  LK = 'LK',
  SD = 'SD',
  SR = 'SR',
  SJ = 'SJ',
  SE = 'SE',
  CH = 'CH',
  SY = 'SY',
  ST = 'ST',
  TW = 'TW',
  TJ = 'TJ',
  TZ = 'TZ',
  TH = 'TH',
  TL = 'TL',
  TG = 'TG',
  TK = 'TK',
  TO = 'TO',
  TT = 'TT',
  TN = 'TN',
  TR = 'TR',
  TM = 'TM',
  TC = 'TC',
  TV = 'TV',
  UG = 'UG',
  UA = 'UA',
  AE = 'AE',
  GB = 'GB',
  US = 'US',
  UM = 'UM',
  VI = 'VI',
  UY = 'UY',
  UZ = 'UZ',
  VU = 'VU',
  VA = 'VA',
  VE = 'VE',
  VN = 'VN',
  WF = 'WF',
  EH = 'EH',
  YE = 'YE',
  ZM = 'ZM',
  ZW = 'ZW',
  KI = 'KI',
  HK = 'HK',
  AX = 'AX',
}

export enum PlanType {
  free = 'free',
  annual = 'annual',
  monthly = 'monthly',
}

export type Plan = {
  id: number;
  title: string;
  type: PlanType;
  price: number;
  subTitle: string;
  users?: Omit<Data<User, Attributes<User>>, 'meta'>;
};

export type User = {
  id: number;
  email: string;
  username: string;
  
  createdAt?: Date;
  updatedAt?: Date;
  password?: string,
  provider?: 'local';
  confirmed?: boolean;
  blocked?: boolean;
  avatar?: string;
  plan?: Omit<Data<Plan, Attributes<Plan>>, 'meta'>;
  country?: CountryCode;
};

export enum ItemCategory {
  Music = 'Music',
  Movie = 'Movie',
  Sport = 'Sport',
  Radio = 'Radio',
}

export enum ItemType {
  Video = 'Video',
  Audio = 'Audio',
}

export enum ItemLabel {
  Recommended = 'Recommended',
  MostWatched = 'MostWatched',
  TrendingNow = 'TrendingNow',
  NewReleases = 'NewReleases',
}

export enum ItemMood {
  Happy = 'Happy',
  Sad = 'Sad',
  Comedy = 'Comedy',
  Horror = 'Horror',
}

export type Item = {
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

  likes?: number;
  mood?: ItemMood;
  relatedItems?: Omit<Data<Item, Attributes<Item>>, 'meta'>;
  likeListUser?: Omit<Data<User, Attributes<User>>, 'meta'>;
};

/* -------------------------------------------------------------------------- */
/*                                    Login                                   */
/* -------------------------------------------------------------------------- */

export type LoginRequestBody = {
  identifier: string;
  password: string;
};

export type LoginResponseBody = {
  jwt: string;
  user: User;
};

/* -------------------------------------------------------------------------- */
/*                               CreateAccount                                */
/* -------------------------------------------------------------------------- */

export type CreateAccountRequestBody = {
  email: string;
  password: string;
  username: string;

  plan?: {connect?: {id: number}[]};
  country?: CountryCode;
};

export type CreateAccountResponseBody = {
  jwt: string;
  user: User & {
    role?: {
      id: number;
      name: string;
      description: string;
      type: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

/* -------------------------------------------------------------------------- */
/*                                GET User Info                               */
/* -------------------------------------------------------------------------- */

export type GetUserInfoResponseBody = User;

/* -------------------------------------------------------------------------- */
/*                                    Items                                   */
/* -------------------------------------------------------------------------- */

export type GetItemsResponseBody = Data<Item, Attributes<Item>[]>;

/* -------------------------------------------------------------------------- */
/*                                   Banner                                   */
/* -------------------------------------------------------------------------- */

export type BannerDates = {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  items: Omit<Data<Item, Attributes<Item>>, 'meta'>;
};

export type BannerResponseBody = Data<BannerDates, Attributes<BannerDates>>;

/* -------------------------------------------------------------------------- */
/*                                 UpdateUser                                 */
/* -------------------------------------------------------------------------- */

export type UserUpdatedResponseBody = User;
export type UserUpdatedRequestBody = Omit<Partial<User>, 'plan'> & {
  plan?: {connect?: {id: number}[]};
};

/* -------------------------------------------------------------------------- */
/*                                  Get Plans                                 */
/* -------------------------------------------------------------------------- */
export type GetPlansResponseBody = Data<Plan, Attributes<Plan>[]>;

/* -------------------------------------------------------------------------- */
/*                                 Report Bug                                 */
/* -------------------------------------------------------------------------- */

export type ReportBugRequestBody = {
  data: {
    description: string;
    user: {connect?: {id: number}[]};
  };
};

export type Bug = {
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
};

export type ReportBugResponseBody = Data<Bug, Attributes<Bug>>;

/* -------------------------------------------------------------------------- */
/*                               Delete Account                               */
/* -------------------------------------------------------------------------- */

export type DeleteAccountResponseBody = User;


/* -------------------------------------------------------------------------- */
/*                            GET One Item Details                            */
/* -------------------------------------------------------------------------- */

export type ItemWithRelations = {
  relatedItems: Data<Item, Attributes<Item>[]>,
  likeListUser: Data<User, Attributes<User>[]>
} & Item;

export type GETItemDetailsResponseBody = Data<ItemWithRelations, Attributes<ItemWithRelations>>