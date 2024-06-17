import { isNotEmpty } from '@/utils/common';

export const sum = <T>(
  list: T[],
  selector?: (item: T) => number,
  initialValue = 0,
) => {
  return list.reduce(
    (acc, item) => acc + (selector?.(item) ?? (item as number)),
    initialValue,
  );
};

export const mapDeepNestedValue = <T>(
  tree: any,
  valueSelector: (item: any) => any,
): T[] => {
  if (Array.isArray(tree)) {
    return tree
      .map((item) => mapDeepNestedValue<T>(item, valueSelector))
      .flat() as T[];
  }

  const treeValue = valueSelector(tree);
  return treeValue ? mapDeepNestedValue<T>(treeValue, valueSelector) : tree;
};

export const getIdsList = <T = number>(array: { id: T }[]) => {
  return array ? array.map((el) => el.id) : [];
};

export const getStringWithSeparator = (
  items: (string | number | undefined)[],
) => {
  return items.filter((item) => isNotEmpty(item)).join(' | ');
};
