import {ItemCategory, ItemLabel} from '../types';

export const useFilter = ({
  populate,
  category,
  label,
}: {
  populate?: '*' | string;
  category?: ItemCategory;
  label?: ItemLabel;
}) => {
  if (category && label) {
    return {
      filter: `?populate=${
        populate ?? `*`
      }?filters[category][$eq]=${category}&filters[label][$eq]=${label}`,
    };
  } else if (category) {
    return {
      filter: `?populate=${populate ?? `*`}?filters[category][$eq]=${category}`,
    };
  } else {
    return {
      filter: `?populate=${populate ?? `*`}?filters[label][$eq]=${label}`,
    };
  }
};
