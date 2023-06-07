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
      filter: `?filters[category][$eq]=${category}&filters[label][$eq]=${label}`,
    };
  } else if (category) {
    return {
      filter: `?filters[category][$eq]=${category}`,
    };
  } else {
    return {
      filter: `?filters[label][$eq]=${label}`,
    };
  }
};
