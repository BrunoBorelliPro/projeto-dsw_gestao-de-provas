import { jsPDF as JsPDF } from 'jspdf'
export default function PluginJsPDF(context, inject) {
  inject('JsPDF', () => {
    const doc = new JsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })
    return doc
  })
}
