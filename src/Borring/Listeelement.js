import { Avatar, Divider, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import backend from '../backend'
import farger from '../farger'
import Flis from '../Kodetre/Kodeliste/Flis'

const Listeelement = ({
  kode,
  primary,
  secondary,
  history,
  geom_id,
  visKoder,
}) => {
  const prefix = kode.substring(0, 2)
  const bgFarge = farger.lys[prefix]
  const avatar = false
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          background:
            'linear-gradient(300deg, hsla(0, 0%, 100%, 0.1) 10%, ' +
            bgFarge +
            ' 50%), url("' +
            backend.getFotoBanner(prefix) +
            '")',
        }}
      >
        <ListItem
          button={true}
          onClick={() => {
            if (geom_id) history.push(`/detaljer/${prefix}/${geom_id}`)
            else history.push(`/katalog/${kode}`)
          }}
        >
          {avatar && (
            <Avatar
              style={{
                backgroundColor: farger.mørk[prefix],
                color: 'black',
              }}
            >
              {prefix}
            </Avatar>
          )}
          <ListItemText
            style={{ color: 'white' }}
            primary={primary}
            secondary={secondary}
          />
          <div style={{ position: 'absolute', right: 8, bottom: 8 }}>
            <Flis kode={kode} visKoder={visKoder} />
          </div>
        </ListItem>
      </div>
      <Divider />
    </React.Fragment>
  )
}

export default withRouter(Listeelement)
