package blog.server.utils;

import java.lang.reflect.Field;

public class EntityUtils {
    public static <T> T applyUpdates(T original, T updates) {
		Field[] fields = original.getClass().getDeclaredFields();

		for(Field field : fields) {

            // Skip static and final fields
            if (java.lang.reflect.Modifier.isStatic(field.getModifiers()) || 
                java.lang.reflect.Modifier.isFinal(field.getModifiers())) {
                    continue;
            }

			field.setAccessible(true);
			try {
				Object newValue = field.get(updates);
				if(newValue != null) 
					field.set(original, newValue);
			} catch (IllegalAccessException e) {
				throw new RuntimeException("Error updating field: " + field.getName(), e);
			}
		}

		return original;
	}
}
