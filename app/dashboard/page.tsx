import { createClient } from '@/lib/supabase/server'
import ProjectList from '@/components/dashboard/ProjectList'
import ExpenseTracker from '@/components/dashboard/ExpenseTracker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = createClient()

  // Parallel data fetching for performance
  const [projectsData, subData] = await Promise.all([
    supabase.from('projects').select('*').limit(5).order('updated_at', { ascending: false }),
    supabase.from('subscriptions').select('*')
  ])

  const projects = projectsData.data || []
  const subscriptions = subData.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ExpenseTracker subs={subscriptions} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        {/* Add more StatCards here */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ProjectList projects={projects} />
        </div>
        <div className="col-span-3">
            {/* Recent activity or Quick Notes would go here */}
            <Card className="h-full">
                <CardHeader><CardTitle>Quick Notes</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Integration pending...</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
