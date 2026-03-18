import MembersTable from "./MemberTable"
import { Button } from "@/components/ui/button"

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Member Directory</h1>
        <Button>+ Add Member</Button>
      </div>
      <MembersTable />
    </div>
  )
}