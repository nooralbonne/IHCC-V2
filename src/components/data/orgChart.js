// Organization chart data, transcribed from the company's org chart.
// `icon` keys map to the icon set in OrgChart.jsx.

export const GENERAL_MANAGER = {
  name: "Eng. Mohammad Al-Hersh",
  title: "General Manager",
};

export const DEPARTMENTS = [
  {
    id: "operations",
    name: "Operations & Projects Division",
    icon: "briefcase",
    featured: true,
    projectManagers: ["Eng. Hazem Ibrahim", "Eng. Obaida Al-Soub"],
    technicalDepartments: [
      { name: "MEP Department", members: ["Eng. Hossam Wael", "Eng. Loai Mansour"] },
      { name: "Civil Department", members: ["Eng. Khaled Jeham", "Eng. Ahmad Al-Zaboun"] },
      { name: "Architectural Design Department", members: ["Eng. Raghad Al-Disi"] },
      { name: "QA/QC & HSE", members: ["Eng. Areen Al-Hersh", "Eng. Marwa Mobaideen"] },
    ],
  },
  {
    id: "technical-office",
    name: "Technical Office",
    icon: "drafting",
    members: ["Eng. Maysam Al-Dumour", "Eng. Dema Dababseh"],
  },
  {
    id: "contracts",
    name: "Contracts Department",
    icon: "file",
    members: ["Eng. Mohannad Al-Hersh", "Eng. Abed Atieh"],
  },
  {
    id: "procurement",
    name: "Procurement & Logistics Department",
    icon: "truck",
    members: ["Eng. Zaid Al-Rawashdeh", "Eng. Leen Al-Alwan"],
  },
  {
    id: "finance",
    name: "Finance Department",
    icon: "calculator",
    members: ["Acct. Heba Takroury"],
  },
  {
    id: "hr",
    name: "HR & Administration Department",
    icon: "users",
    members: ["Ehab Al-Tiffa'e — Public Relations", "Omar Shnyour — Human Resources"],
  },
  {
    id: "legal",
    name: "Legal Department",
    icon: "scale",
    members: ["Advoc. Yaseen Mobaideen", "Advoc. Mo'een Halalmeh"],
  },
  {
    id: "it",
    name: "IT Department",
    icon: "monitor",
    members: ["Waheed Atieh"],
  },
  {
    id: "equipment",
    name: "Equipment Maintenance Department",
    icon: "wrench",
    members: ["Moayad Al-Hersh"],
  },
];
