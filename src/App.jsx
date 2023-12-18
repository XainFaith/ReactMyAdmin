import React, { createContext, useState } from 'react';
import LoginPanel from './Components/LoginPanel';
import Notifier from './Components/Notifier/Notifier';

import { UserAccessContext, user } from './Components/AuthUser';
import DatabasePanel from './Components/DatabasePanel';

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
                        <DatabasePanel />
                    </div>
                </UserAccessContext.Provider>
                :
                <LoginPanel onGranted={onGranted}/>
            }
            </Notifier>);

}