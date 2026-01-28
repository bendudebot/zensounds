import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../constants/theme';

// =============================================================================
// TYPES
// =============================================================================

interface CategoryHeaderProps {
  title: string;
  icon: string;
  description?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CategoryHeader({ title, icon, description }: CategoryHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: LAYOUT.screenPadding,
    marginBottom: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  icon: {
    fontSize: LAYOUT.iconSize.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.muted,
    marginLeft: LAYOUT.iconSize.lg + SPACING.sm,
  },
});
