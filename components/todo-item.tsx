import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '@/hooks/use-todos';
import { useThemeColor } from '@/hooks/use-theme-color';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333' }, 'border');

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={todo.completed ? tintColor : textColor}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          { color: textColor },
          todo.completed && styles.completedTitle,
        ]}
      >
        {todo.title}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteButton: {
    padding: 8,
  },
});
