import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'react-native';

export const Container = styled(LinearGradient).attrs(() => ({
  colors: ['#7159c1', '#43289f'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
}))`
  flex: 1;
  padding-top: ${StatusBar.currentHeight + 10}px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fff;

  padding: 0 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #fff;

  border: 2px solid ${(props) => (props.error ? '#ff7272' : '#fff')};
`;

export const Submit = styled.TouchableOpacity`
  background: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 16px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
