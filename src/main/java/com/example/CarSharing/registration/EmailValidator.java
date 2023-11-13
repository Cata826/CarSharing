package com.example.CarSharing.registration;


import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Service
public class EmailValidator implements Predicate<String> {


//    private static final String EMAIL_PATTERN =
//            "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@ingineriaSistemelor\\.com$";
//
//    private final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
    @Override
    public boolean test(String s) {
//        return pattern.matcher(s).matches();
        return true;
    }
}