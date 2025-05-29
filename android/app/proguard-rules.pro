# React Native core
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Hermes
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# Native Modules and View Managers
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keep class * extends com.facebook.react.uimanager.ViewManager { *; }
-keepclassmembers class * extends com.facebook.react.bridge.NativeModule { public *; }
-keepclassmembers class * extends com.facebook.react.uimanager.ViewManager { public *; }

# Annotations
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}
-keepattributes *Annotation*

# AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Vector Icons
-keep class com.oblador.vectoricons.** { *; }
-dontwarn com.oblador.vectoricons.**

# Lottie
-keep class com.airbnb.lottie.** { *; }
-dontwarn com.airbnb.lottie.**

# Document Picker
-keep class com.reactnativedocumentpicker.** { *; }
-dontwarn com.reactnativedocumentpicker.**

# SafeAreaContext (optional)
-keep class com.th3rdwave.safeareacontext.** { *; }
-dontwarn com.th3rdwave.safeareacontext.**

# Unistyles
-keep class com.unistyles.** { *; }
-dontwarn com.unistyles.**

# ReactActivity and ReactApplication
-keep public class com.facebook.react.ReactActivity { *; }
-keep public class com.facebook.react.ReactApplication { *; }

# ReactPackage
-keep class * implements com.facebook.react.ReactPackage { *; }

# All app Activities and Fragments
-keep public class * extends android.app.Activity
-keep public class * extends androidx.fragment.app.Fragment

# (Optional) Logging - strip debug logs
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Keep attributes needed by reflection
-keepattributes InnerClasses
-keepattributes Signature
-keepattributes EnclosingMethod
