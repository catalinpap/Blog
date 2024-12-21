package blog.server.utils;

import java.lang.reflect.Field;

public class EntityUtils {

    public static <T, E> T applyUpdates(T original, E updates) {
        Field[] originalFields = original.getClass().getDeclaredFields();
        Field[] updateFields = updates.getClass().getDeclaredFields();

        for (Field originalField : originalFields) {
            if (java.lang.reflect.Modifier.isStatic(originalField.getModifiers()) || 
                java.lang.reflect.Modifier.isFinal(originalField.getModifiers())) {
                continue; // Skip static and final fields
            }

            originalField.setAccessible(true);

            for (Field updateField : updateFields) {
                if (originalField.getName().equals(updateField.getName()) && 
                    isCompatible(originalField, updateField)) {
                    try {
                        updateField.setAccessible(true);
                        Object newValue = updateField.get(updates);
                        if (newValue != null) {
                            originalField.set(original, newValue);
                        }
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException("Error updating field: " + originalField.getName(), e);
                    }
                }
            }
        }

        return original;
    }

    private static boolean isCompatible(Field originalField, Field updateField) {
        return originalField.getType().isAssignableFrom(updateField.getType());
    }
}

