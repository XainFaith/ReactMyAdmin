import React, { useEffect, useState } from 'react';
import LoginPanel from './Components/LoginPanel';
import Notifier from './Components/Notifier/Notifier';
import ResizeablePanel from './Components/UI/ResizeablePanels/ResizeablePanel';
import ResizeHandle from './Components/UI/ResizeablePanels/ResizeHandle';
import { UserAccessContext, user } from './Components/AuthUser';
import Sidebar from './Components/SideBar';

export default function App()
{

    const [authUser, setAuthUser] = useState(user);

    function onGranted(token)
    {
        setAuthUser({...authUser, authToken: token, logout: onLogout});
    }

    function onLogout()
    {
        setAuthUser({...authUser, authToken: null});
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