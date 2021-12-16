import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

const imageSrc = require('../../assets/butterflies.png');

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectMood, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[styles.moodItem]}
              key={option.emoji}
              style={[
                styles.moodItem,
                selectedMood?.emoji === option.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text key={option.emoji} style={styles.moodText}>
                {option.emoji}
              </Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {option.emoji === selectedMood?.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 0,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
  },
});
