import * as _ from 'lodash';

export function runnerFilter(item, search){
  if (search && search.length > 0){
      return _.startsWith(item.firstName,search) || _.startsWith(item.lastName,search) || _.startsWith(item.number,search) || _.startsWith(item.email,search)
  }
  return item;
}
