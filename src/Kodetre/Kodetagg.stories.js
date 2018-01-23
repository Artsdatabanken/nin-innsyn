import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import Kodetagg from './Kodetagg'
import rødlistekoder from '../../public/kode/rødliste'

storiesOf('Kodetagg', module)
  .addDecorator(muiTheme())
  .add('Rødliste', () => {
    return (
      <div style={{ padding: 8 }}>
        {rødlistekoder.tagger.map(tag => (
          <Kodetagg
            key={tag.kode}
            kode={tag.kode}
            navn={tag.navn}
            color={tag.color}
            backgroundColor={tag.backgroundColor}
          />
        ))}
      </div>
    )
  })
