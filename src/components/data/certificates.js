import certQmsImage from "../../assets/certificates/cert-qms-iso9001.jpg";
import certOhsmsImage from "../../assets/certificates/cert-ohsms-iso45001.jpg";
import certEmsImage from "../../assets/certificates/cert-ems-iso14001.jpg";
import qmsPdf from "../../assets/certificates/2794_Ismail_Establishment_QMS.pdf";
import ohsmsPdf from "../../assets/certificates/2794_Ismail_Establishment_OH_SMS.pdf";
import emsPdf from "../../assets/certificates/2794_Ismail_Establishment_EMS.pdf";

// Certificate data. Each `pdf` path should point at wherever the original
// PDF is hosted in your project (e.g. /public/certificates/...).
export const CERTIFICATES = [
  {
    slug: "iso-9001",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    scope:
      "Provision of General Contracting and Construction Project Management including Building, Infrastructure and Electromechanical Works.",
    certNo: "2794/ISM09A",
    issueDate: "03.04.2025",
    validUntil: "02.04.2028",
    image: certQmsImage,
    pdf: qmsPdf,
  },
  {
    slug: "iso-45001",
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    scope:
      "Provision of General Contracting and Construction Project Management including Building, Infrastructure and Electromechanical Works.",
    certNo: "2794/ISM45A",
    issueDate: "03.04.2025",
    validUntil: "02.04.2028",
    image: certOhsmsImage,
    pdf: ohsmsPdf,
  },
  {
    slug: "iso-14001",
    title: "ISO 14001:2015",
    subtitle: "Environmental Management System",
    scope:
      "Provision of General Contracting and Construction Project Management including Building, Infrastructure and Electromechanical Works.",
    certNo: "2794/ISM14A",
    issueDate: "03.04.2025",
    validUntil: "02.04.2028",
    image: certEmsImage,
    pdf: emsPdf,
  },
];
