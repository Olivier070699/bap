import React, { Component } from 'react'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

export class Pdf extends Component {
    render() {
      const MyDoc = () => (
        <Document>
          <Page>
            <Text>Tits</Text>
          </Page>
        </Document>
      )
        return (
          <div>
            <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </div>
        )
    }
}
export default Pdf
