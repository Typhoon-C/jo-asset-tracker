export type AssetStatus = 'Active' | 'In Repair' | 'Retired' | 'Pending';

export interface Asset {
  id: string;
  tag: string;
  name: string;
  type: string;
  owner: string;
  location: string;
  status: AssetStatus;
  warranty: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  requester: string;
  asset: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Waiting' | 'Resolved';
  createdAt: string;
}

export const summaryCards = [
  { label: 'Total Assets', value: '312', trend: '+12%' },
  { label: 'Open Requests', value: '24', trend: '-8%' },
  { label: 'Critical Items', value: '5', trend: '2 today' },
  { label: 'Warranty Alerts', value: '11', trend: '4 due soon' }
];

export const assets: Asset[] = [
  {
    id: 'AST-1042',
    tag: 'LAP-2201',
    name: 'Dell Latitude 7440',
    type: 'Laptop',
    owner: 'Maria Silva',
    location: 'HQ - Floor 2',
    status: 'Active',
    warranty: '2027-06-18'
  },
  {
    id: 'AST-1061',
    tag: 'MON-1188',
    name: 'Dell UltraSharp 27',
    type: 'Monitor',
    owner: 'John Boyle',
    location: 'HQ - Floor 4',
    status: 'In Repair',
    warranty: '2026-09-08'
  },
  {
    id: 'AST-1110',
    tag: 'SRV-2099',
    name: 'Windows Server 2022',
    type: 'Server',
    owner: 'IT Infrastructure',
    location: 'Data Center',
    status: 'Active',
    warranty: '2028-11-12'
  },
  {
    id: 'AST-1203',
    tag: 'NET-7703',
    name: 'Cisco Catalyst 9300',
    type: 'Network Device',
    owner: 'Network Team',
    location: 'Branch A',
    status: 'Pending',
    warranty: '2026-12-15'
  },
  {
    id: 'AST-1225',
    tag: 'TBL-8804',
    name: 'Surface Hub 2S',
    type: 'Collaboration',
    owner: 'Operations',
    location: 'Meeting Room 3',
    status: 'Retired',
    warranty: 'Expired'
  }
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: 'SR-2026-0048',
    title: 'Laptop display flicker',
    requester: 'Kurt James',
    asset: 'Dell Latitude 7440',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-08-12'
  },
  {
    id: 'SR-2026-0056',
    title: 'VPN access request',
    requester: 'Alicia Hart',
    asset: 'User Profile',
    priority: 'Medium',
    status: 'Waiting',
    createdAt: '2026-08-13'
  },
  {
    id: 'SR-2026-0061',
    title: 'Printer cartridge replacement',
    requester: 'Finance Team',
    asset: 'HP LaserJet Pro MFP',
    priority: 'Low',
    status: 'Open',
    createdAt: '2026-08-14'
  },
  {
    id: 'SR-2026-0064',
    title: 'Server room temperature alert',
    requester: 'IT Infrastructure',
    asset: 'Data Center Rack A',
    priority: 'Critical',
    status: 'Open',
    createdAt: '2026-08-14'
  }
];
