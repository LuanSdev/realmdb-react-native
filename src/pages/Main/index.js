import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Repository from '~/Components/Repository';
import api from '~/Services/api';
import getRealm from '~/Services/realm';

import {Container, Title, Form, Input, Submit, List} from './styles';

const Main = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();

      const data = realm.objects('Repository').sorted('stars', true);

      setRepos(data);
    }

    loadRepositories();
  }, []);

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });

    return data;
  }

  async function handleAddRepository() {
    try {
      const {data} = await api.get(`/repos/${input}`);

      await saveRepository(data);

      setInput('');
      setError(false);

      Keyboard.dismiss();
    } catch {
      setError(true);
    }
  }

  async function handleRefreshRepository(repository) {
    const {data} = await api.get(`/repos/${repository.fullName}`);

    const updatedRepo = await saveRepository(data);

    setRepos(
      repos.map((repo) =>
        repo.id === updatedRepo.id ? updatedRepo : repo,
      ),
    );
  }

  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          error={error}
          onChangeText={(text) => {
            setInput(text);
            setError(false);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar reposotório..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#fff" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersist="handled"
        data={repos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
          />
        )}
      />
    </Container>
  );
};

export default Main;
