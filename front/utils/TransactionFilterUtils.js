import { get, isArray } from 'lodash'
import Transaction from '~/models/Transaction.js'
import Tag from '~/models/Tag.js'
import Category from '~/models/Category.js'
import Account from '~/models/Account.js'

export default class TransactionFilterUtils {
  static get types() {
    return {
      description: {
        field: 'description',
        url: 'description',
      },
      transactionType: {
        field: 'transactionType',
        url: 'transaction_type',
      },
      tag: {
        field: 'tag',
        url: 'tag_id',
      },
      noTag: {
        field: 'noTag',
        url: 'no_tag',
      },
      excludeTag: {
        field: 'excludeTag',
        url: 'exclude_tag_id',
      },
      category: {
        field: 'category',
        url: 'category_id',
      },
      noCategory: {
        field: 'noCategory',
        url: 'no_category',
      },
      excludeCategory: {
        field: 'excludeCategory',
        url: 'exclude_category_id',
      },
      account: {
        field: 'account',
        url: 'account_id',
      },
      excludeAccount: {
        field: 'excludeAccount',
        url: 'exclude_account_id',
      },
      amountStart: {
        field: 'amountStart',
        url: 'amount_start',
      },
      amountEnd: {
        field: 'amountEnd',
        url: 'amount_end',
      },
      dateStart: {
        field: 'dateStart',
        url: 'date_start',
      },
      dateEnd: {
        field: 'dateEnd',
        url: 'date_end',
      },
    }
  }

  static getFilterParamFromURL = (urlParam, transformer) => {
    const route = useRoute()
    let list = get(route.query, urlParam) ?? []
    list = isArray(list) ? list : [list]
    return list.map(transformer).filter((item) => item)
  }

  static getFiltersFromURL() {
    const route = useRoute()
    const dataStore = useDataStore()

    // const excludedTag: getExcludedFromUrl('excluded_tag_id', (id) => dataStore.tagDictionaryById[id]),

    return {
      // [this.types.tag.field]: dataStore.tagDictionaryById[get(route.query, 'tag_id')],

      [this.types.tag.field]: this.getFilterParamFromURL(this.types.tag.url, (id) => dataStore.tagDictionaryById[id]),


      excludedTag: dataStore.tagDictionaryById[get(route.query, 'excluded_tag_id')],
      transactionType: Object.values(Transaction.types).find((item) => item.code === get(route.query, 'type')),
      category: dataStore.categoryDictionary[get(route.query, 'category_id')],
      excludedCategory: dataStore.categoryDictionary[get(route.query, 'excluded_category_id')],
      account: dataStore.accountDictionary[get(route.query, 'account_id')],
      excludedAccount: dataStore.accountDictionary[get(route.query, 'excluded_account_id')],
      description: get(route.query, 'description'),
      dateStart: DateUtils.stringToDate(get(route.query, 'date_start')),
      dateEnd: DateUtils.stringToDate(get(route.query, 'date_end')),
      amountStart: get(route.query, 'amount_start'),
      amountEnd: get(route.query, 'amount_end'),
      withoutTag: get(route.query, 'without_tag'),
      withoutCategory: get(route.query, 'without_category'),
    }
  }
}
