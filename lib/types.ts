export type InternalStatus = 'READY' | 'EXTRACTED' | 'VALIDATED' | 'COMPLETED' | 'ERROR'

export interface ExtractionHeader {
  CAE?: string | null
  CAEDueDate?: string | null
  Description?: string
  InvoiceDate?: string
  InvoiceType?: string
  BusinessUnit?: string
  SupplierName?: string
  SupplierSite?: string
  CajeroExpress?: string
  InvoiceAmount?: number
  InvoiceNumber?: string
  PurchaseOrder?: string | null
  SupplierTaxID?: string
  ConversionDate?: string | null
  ConversionRate?: number | null
  ShipToLocation?: string
  InvoiceCurrency?: string
  LetraComprobante?: string | null
  CodigoComprobante?: string | null
}

export interface ExtractionLine {
  Amount?: number
  VATRate?: number
  LineType?: string
  PONumber?: string | null
  UnitPrice?: number | null
  LineNumber?: number
  ExpenseType?: string
  POLineNumber?: string | null
  SupplierItem?: string | null
  ShipToLocation?: string
  InvoiceQuantity?: number
  ItemDescription?: string
  TaxClassificationCode?: string | null
  DistributionCombination?: string | null
}

export interface ExtractionTax {
  Tax?: string
  TaxRate?: number
  TaxAmount?: number
  TaxableAmount?: number
}

export interface RawExtractionJson {
  lines?: ExtractionLine[]
  taxes?: ExtractionTax[]
  header?: ExtractionHeader
}

export interface Comprobante {
  document_id: string
  file_id: string
  bu_id?: string | null
  supplier_id?: string | null
  supplier_site_id?: string | null
  invoice_num: string
  invoice_date: string
  total_amount: string
  currency_code: string
  exchange_rate?: number | null
  internal_status: InternalStatus
  retry_count: number
  is_manual_correction: boolean
  reprocess_ready: boolean
  last_error_short?: string | null
  oracle_invoice_id?: string | null
  created_at: string
  updated_at: string
  raw_extraction_json?: RawExtractionJson
  tax_registration_number?: string
  po_number?: string | null
  oracle_invoice_num?: string | null
}

export interface ComprobanteStats {
  total: number
  ready: number
  extracted: number
  validated: number
  completed: number
  error: number
  totalAmount: number
  avgAmount: number
  currencies: Record<string, number>
}

export interface FilterOptions {
  status?: InternalStatus | ''
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  supplier?: string
  currency?: string
}
