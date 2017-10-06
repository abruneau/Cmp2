import { SalesforceService } from '../providers';

export class Report {
  title: string
  query: string
  columns: Array<Column>
  refreshing = false
  data
  error: string = null

  constructor(object?) {
    if (object) {
      this.title = object.title || 'New Report'
      this.query = object.query || null
      this.columns = object.columns as Column[] || []
      this.data = object.data
      this.error = object.error || null
    }

  }

  refresh(sf: SalesforceService): Promise<any> {
    this.refreshing = true
    return sf.query(this.query).then((res) => {
      this.data = res.records
      this.error = null
    }).catch((e) => {
      this.error = e
      this.data = null
    }).then(() => {
      this.refreshing = false
    })
  }
}

interface Column {
  key: string
  value: string
}
