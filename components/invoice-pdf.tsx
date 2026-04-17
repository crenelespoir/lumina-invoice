// Template PDF de la facture
// Définit le design du document PDF téléchargeable

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Les styles du PDF — similaire au CSS mais spécifique à react-pdf
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1e293b",
  },
  // Header de la facture
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  companyName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
  },
  companyInfo: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 4,
    lineHeight: 1.5,
  },
  invoiceTitle: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#2e86c1",
    textAlign: "right",
  },
  invoiceNumber: {
    fontSize: 10,
    color: "#64748b",
    textAlign: "right",
    marginTop: 4,
  },
  // Section client
  clientSection: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  clientInfo: {
    fontSize: 9,
    color: "#64748b",
    lineHeight: 1.5,
  },
  // Dates
  datesRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  dateBox: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  dateLabel: {
    fontSize: 9,
    color: "#94a3b8",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  // Tableau des services
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1e3a5f",
    padding: 10,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableRowAlt: {
    backgroundColor: "#f8fafc",
  },
  col6: { flex: 6 },
  col2: { flex: 2, textAlign: "center" },
  col2Right: { flex: 2, textAlign: "right" },
  // Totaux
  totalsSection: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 40,
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 9,
    color: "#64748b",
    width: 100,
    textAlign: "right",
  },
  totalValue: {
    fontSize: 10,
    width: 80,
    textAlign: "right",
  },
  totalFinalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 40,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#1e3a5f",
  },
  totalFinalLabel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    width: 100,
    textAlign: "right",
  },
  totalFinalValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    width: 80,
    textAlign: "right",
  },
  // Pied de page
  footer: {
    marginTop: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  footerText: {
    fontSize: 9,
    color: "#64748b",
    lineHeight: 1.5,
  },
});

// Les types des données nécessaires pour le PDF
type InvoicePDFProps = {
  invoice: {
    number: string;
    currency: string;
    status: string;
    subtotal: string;
    taxRate: string;
    taxAmount: string;
    total: string;
    issuedAt: Date | null;
    dueAt: Date | null;
  };
  client: {
    name: string;
    email: string;
    address: string | null;
    country: string | null;
  };
  company: {
    name: string;
    address: string | null;
    bankDetails: string | null;
    taxNumber: string | null;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: string;
    lineTotal: string;
  }[];
};

export default function InvoicePDF({
  invoice,
  client,
  company,
  items,
}: InvoicePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header — Infos entreprise + Titre facture */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyInfo}>
              {company.address}{"\n"}
              {company.taxNumber ? `N° fiscal : ${company.taxNumber}` : ""}
            </Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>FACTURE</Text>
            <Text style={styles.invoiceNumber}>{invoice.number}</Text>
          </View>
        </View>

        {/* Informations client */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionTitle}>Facturé à</Text>
          <Text style={styles.clientName}>{client.name}</Text>
          <Text style={styles.clientInfo}>
            {client.email}{"\n"}
            {client.address}{"\n"}
            {client.country}
          </Text>
        </View>

        {/* Dates */}
        <View style={styles.datesRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Date d'émission</Text>
            <Text style={styles.dateValue}>
              {invoice.issuedAt
                ? new Date(invoice.issuedAt).toLocaleDateString("fr-FR")
                : "—"}
            </Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Date d'échéance</Text>
            <Text style={styles.dateValue}>
              {invoice.dueAt
                ? new Date(invoice.dueAt).toLocaleDateString("fr-FR")
                : "—"}
            </Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Devise</Text>
            <Text style={styles.dateValue}>{invoice.currency}</Text>
          </View>
        </View>

        {/* Tableau des services */}
        <View style={styles.table}>
          {/* En-tête du tableau */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.col6]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.col2]}>Qté</Text>
            <Text style={[styles.tableHeaderText, styles.col2Right]}>Prix unit.</Text>
            <Text style={[styles.tableHeaderText, styles.col2Right]}>Total</Text>
          </View>

          {/* Lignes de service */}
          {items.map((item, index) => (
            <View
              key={index}
              style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.col6}>{item.description}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col2Right}>
                {Number(item.unitPrice).toFixed(2)}
              </Text>
              <Text style={styles.col2Right}>
                {Number(item.lineTotal).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total HT</Text>
            <Text style={styles.totalValue}>
              {Number(invoice.subtotal).toFixed(2)} {invoice.currency}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA ({invoice.taxRate}%)</Text>
            <Text style={styles.totalValue}>
              {Number(invoice.taxAmount).toFixed(2)} {invoice.currency}
            </Text>
          </View>
          <View style={styles.totalFinalRow}>
            <Text style={styles.totalFinalLabel}>Total TTC</Text>
            <Text style={styles.totalFinalValue}>
              {Number(invoice.total).toFixed(2)} {invoice.currency}
            </Text>
          </View>
        </View>

        {/* Pied de page — coordonnées bancaires */}
        {company.bankDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Informations de paiement</Text>
            <Text style={styles.footerText}>{company.bankDetails}</Text>
          </View>
        )}

      </Page>
    </Document>
  );
}