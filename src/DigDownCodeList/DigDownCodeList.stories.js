import React from 'react'
import { storiesOf } from '@storybook/react'
import DigDownCodeList from './DigDownCodeList'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

var dummyItems = [
  {
    kode: 'NA_F',
    navn: 'Limniske vannmasser',
    antall: 3613,
    harBarn: true,
  },
  {
    kode: 'NA_H',
    navn: 'Marine vannmasser',
    antall: 247,
    harBarn: true,
  },
  {
    kode: 'NA_L',
    navn: 'Ferskvannsbunnsystemer',
    antall: 3207,
    harBarn: true,
  },
  {
    kode: 'NA_M',
    navn: 'Saltvannsbunnsystemer',
    antall: 2502,
    harBarn: true,
  },
  {
    kode: 'NA_T',
    navn: 'Fastmarkssystemer',
    antall: 72816,
    harBarn: true,
  },
  {
    kode: 'NA_V',
    navn: 'Våtmarkssystemer',
    antall: 20920,
    harBarn: true,
  },
]

storiesOf('DigDownCodeList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <DigDownCodeList
      items={dummyItems}
      isSelected={action('selection')}
      onClick={action('click')}
      onCheck={action('check')}
    />
  ))
