import * as React from 'react';
import { useMsal } from '@azure/msal-react';
import { DetailsListLayoutMode, DetailsRow, IDetailsRowProps, Label, SelectionMode, ShimmeredDetailsList, Text } from '@fluentui/react';
import { getGreeting } from '../api/helloApi';

export type IGreetingProps = {
  name: string | null
}

export const Greeting = (props: IGreetingProps) => {
  const { instance } = useMsal();
  const [items, setItems] = React.useState<any>([]);

  React.useEffect(() => {
    const getResponse = async (name: string) => {
      const response = await getGreeting(name, instance);
      if (response) {
        const newItems = [];
        newItems.push({
          key: 'inputval',
          meaning: (<Label>Input value</Label>),
          value: (<Text>{props.name}</Text>)
        })
        newItems.push({
          key: 'greeting',
          meaning: (<Label>Greeting</Label>),
          value: (<Text>{response.greeting}</Text>)
        })
        newItems.push({
          key: 'user',
          meaning: (<Label>User</Label>),
          value: (<Text>{response.identifiedUser}</Text>)
        })
        newItems.push({
          key: 'userid',
          meaning: (<Label>UserId</Label>),
          value: (<Text>{response.identifiedUserId}</Text>)
        })
        setItems(newItems)
      }
    }

    setItems([]);
    getResponse(props.name || "");
  }, [props.name])

  const columns = [
    {key: 'col1', name: 'Meaning', fieldName: 'meaning', minWidth: 100, maxWidth: 150, isResizable: true},
    {key: 'col2', name: 'Value', fieldName: 'value', minWidth: 200, maxWidth: 800, isResizable: true}
  ]

  const renderDetailsRow = (props: IDetailsRowProps | undefined) => {
    if (props) {
      return <DetailsRow {...props} />
    } else {
      return <></>
    }
  }

  return (
    <ShimmeredDetailsList
      items={items}
      columns={columns}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      onRenderRow={renderDetailsRow}
      enableShimmer={items.length == 0}
      shimmerLines={4}
    />
  )
}