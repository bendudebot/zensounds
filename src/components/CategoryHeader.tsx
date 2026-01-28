import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../constants/theme';

// =============================================================================
// TYPES
// =============================================================================

interface CategoryHeaderProps {
  title: string;
  icon: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CategoryHeader({ title, icon }: CategoryHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  icon: {
    fontSize: LAYOUT.iconSize.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },
});
