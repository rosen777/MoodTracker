import React from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from '../App.provider';
import { VictoryPie } from 'victory-native';
import { groupBy } from 'lodash';

export const Analytics: React.FC = () => {
  const appContext = useAppContext();
  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );

  return (
    <View>
      <VictoryPie data={data} />
    </View>
  );
};
