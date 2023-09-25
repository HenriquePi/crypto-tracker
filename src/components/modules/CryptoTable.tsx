"use client"

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { getSpecificCryptos, getTopCryptos } from '@/utils/cryptoAPI';
import { UserContext } from '@/utils/userContext';
import { Coin } from '@/types/Coin';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'symbol', headerName:'Symbol', width:70 },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'current_price',
    headerName: 'Price (USD)',
    type: 'number',
    width: 125,
  },
];

export default function CryptoTable({showFavorites = false}) {

  const {updateFavoriteCryptos, favoriteCryptos, topCryptoData, trackedCryptoData} = React.useContext(UserContext);

  // set table
  const [rows, setRows] = React.useState<Coin[]>([]);
  // Function set and update rows
  React.useEffect(() => {
    if (showFavorites) {
      setRows(trackedCryptoData);
    } else {
      setRows(topCryptoData);
    }
  }, [showFavorites, topCryptoData, trackedCryptoData]);
  


  if (rows) return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}

        pageSizeOptions={[5, 10]}
        checkboxSelection={!showFavorites}
        rowSelectionModel={!showFavorites ? favoriteCryptos : []}
        onRowSelectionModelChange={(ids) => {
          !showFavorites && updateFavoriteCryptos(ids as string[]);
        }}
      />
    </div>
  );
}