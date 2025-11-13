import { ConnectButton } from '@/features/connect/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { Sidebar } from '@/shared/ui'
import { MenuIcon } from 'lucide-react'

const Header = () => {
  const isMobile = useIsMobile()

  return (
    <div className="border-b-2 w-full fixed start-0 top-0 bg-background z-20">
      <div className="flex py-6 mx-auto container px-4">
        {isMobile && (
          <Sidebar.Trigger>
            <MenuIcon />
          </Sidebar.Trigger>
        )}

        <div className="ms-auto">
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}

export { Header }
