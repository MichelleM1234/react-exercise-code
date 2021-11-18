import React, { useState, useEffect, Component } from 'react';
import { UserAccount, BanksList } from './typings';

export default function App(): React.ReactElement {
  const [users, setUsers] = useState<UserAccount[]>([]);

  useEffect(() => {
    mockApi.fetchUsers()
      .then(setUsers);
  }, []);

   let totalBalance: number = 0;

   for(const user of users) {
    const balance = user.balance;
    totalBalance += balance;
   }

   let yorkshireFinanceUsers: UserAccount[] = users.filter(user => user.bank === "Yorkshire Finance" );

   // let totalBalancePerUser: UserAccount[] = users.filter(user => user.name === "Yorkshire Finance" );


    const balanceByName: { [key: string]: any } = {};
    for (const user of users) {
        if (balanceByName[user.name] !== undefined) {
            balanceByName[user.name] += user.balance;
        } else {
            balanceByName[user.name] = user.balance;
        }
    }
    const customerNames = Object.keys(balanceByName);

  return (
    <div>
      <p>Total balance across all bank accounts: £{totalBalance} </p>
      <div>
          {yorkshireFinanceUsers.map(({ name }) => (
            <span>Yorkshire Finance Customer: {name}
            <br />
            </span>
          ))}
        </div>
        <br />
        <div>
          {customerNames.map((name) => (
            <span>
                Total balance for {name} across all their accounts: £{ balanceByName[name]}
                <br />
            </span>
          ))}
        </div>
    </div>
  );
}

const mockApi = {
  fetchUsers(): Promise<UserAccount[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 500);
    });
  }
};

const data: UserAccount[] = [
  {
    name: "David Davidson",
    bank: "Scottish Bank",
    accountType: "current",
    balance: 500
  },
  {
    name: "Robert Paulson",
    bank: "London Bank",
    accountType: "savings",
    balance: 10000
  },
  {
    name: "David Davidson",
    bank: "London Bank",
    accountType: "savings",
    balance: 5000
  },
  {
    name: "Regina George",
    bank: "Yorkshire Finance",
    accountType: "current",
    balance: 999
  },
  {
    name: "Regina George",
    bank: "Yorkshire Finance",
    accountType: "savings",
    balance: 1001
  },
  {
    name: "Philip Johnson",
    bank: "Scottish Bank",
    accountType: "current",
    balance: 869
  },
  {
    name: "Claire Philips",
    bank: "London Bank",
    accountType: "current",
    balance: 1234
  },
  {
    name: "Megan Reid",
    bank: "Scottish Bank",
    accountType: "current",
    balance: -200
  },
  {
    name: "John Edwards",
    bank: "Scottish Bank",
    accountType: "current",
    balance: -500
  },
  {
    name: "Michael Komorowski",
    bank: "Yorkshire Finance",
    accountType: "current",
    balance: 999
  },
  {
    name: "Michelle Johnson",
    bank: "Yorkshire Finance",
    accountType: "current",
    balance: 800
  }
];
