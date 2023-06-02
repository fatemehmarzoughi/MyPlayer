import {useRef} from 'react';
import {ItemCategory, ItemLabel} from '../types';

export const useFilter = ({
  populate,
  category,
  label,
}: {
  populate?: '*' | string,
  category?: ItemCategory;
  label?: ItemLabel;
}) => {
  const resultFilter = useRef<string>();

  if (category && label) {
    resultFilter.current = `?populate=${populate ?? `*`}?filters[category][$eq]=${category}&filters[label][$eq]=${label}`;
  } else if (category) {
    resultFilter.current = `?populate=${populate ?? `*`}?filters[category][$eq]=${category}`;
  } else {
    resultFilter.current = `?populate=${populate ?? `*`}?filters[label][$eq]=${label}`;
  }

  return {filter: resultFilter.current};
};
