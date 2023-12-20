import React, { createContext, useState } from 'react';
import LoginPanel from './Components/LoginPanel';
import Notifier from './Components/Notifier/Notifier';
import ResizeablePanel from './Components/UI/ResizeablePanels/ResizeablePanel';
import ResizeHandle from './Components/UI/ResizeablePanels/ResizeHandle';
import { UserAccessContext, user } from './Components/AuthUser';
import DatabasePanel from './Components/DatabasePanel';
import Sidebar from './Components/SideBar';

export default function App()
{

    const [authUser, setAuthUser] = useState(user);

    function onGranted(token)
    {
        setAuthUser({...authUser, authToken: token});
    }

    return( <Notifier> 
            { authUser.authToken ? 
                <UserAccessContext.Provider  value={authUser}> 
                    <div className='WorkSpace'>
                        <Sidebar />
                        <div className="SubSpace">
                            <ResizeablePanel isVertical={true} defaultSize="70%">
                            </ResizeablePanel>
                            <ResizeHandle isVertical={true}/>
                            <ResizeablePanel isVertical={true} defaultSize="30%">
                            </ResizeablePanel>
                        </div>
                    </div>
                </UserAccessContext.Provider>
                :
                <LoginPanel onGranted={onGranted}/>
            }
            </Notifier>);

}