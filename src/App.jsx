import React, { useEffect, useState } from 'react';

import UserAccessProvider from './Context/AuthUser';
import Notifier from './Components/Notifier/Notifier';
import UserArea from './UserArea';
import NonUserArea from './NonUserArea';

import "./App.css";

export default function App()
{

    return( <Notifier> 
            <UserAccessProvider>
                <UserArea />
                <NonUserArea />
            </UserAccessProvider>
            </Notifier>);

}