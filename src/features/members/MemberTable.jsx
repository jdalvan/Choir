import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const members = [
  { id: 1, name: "Jean Paul", role: "Soprano", status: "Active" },
  { id: 2, name: "Marie Claire", role: "Alto", status: "Active" },
]

export default function MembersTable() {
  return (
    <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
      <h2 className="text-xl font-bold mb-4">Choir Members</h2>
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id} className="border-white/10">
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.role}</TableCell>
              <TableCell className="text-[#a3e635]">{m.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}