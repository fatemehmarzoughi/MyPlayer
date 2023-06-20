import {useFilter} from '../../../src/API/hooks';
import {ItemCategory, ItemLabel} from '../../../src/API/types';

describe('test filter hook', () => {
  beforeAll(() => {});

  it('should return the proper filter for the specific category', () => {
    const {filter} = useFilter({
      category: ItemCategory.Movie,
    });

    expect(filter).toBe('?filters[category][$eq]=Movie');
  });

  it('should return the proper filter for the specific label', () => {
    const {filter} = useFilter({
      label: ItemLabel.MostWatched,
    });

    expect(filter).toBe('?filters[label][$eq]=MostWatched');
  });

  it('should return the proper filter for the specific label & category', () => {
    const {filter} = useFilter({
      category: ItemCategory.Movie,
      label: ItemLabel.MostWatched,
    });

    expect(filter).toBe(
      '?filters[category][$eq]=Movie&filters[label][$eq]=MostWatched',
    );
  });
});
