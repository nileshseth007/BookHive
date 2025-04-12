package com.neom108.spring_boot_library.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction){
        token.replace("Bearer", "");
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        String[] entries = payload.split(",");
        /*
        {
          "ver": 1,
          "jti": "AT.B8ZjJ0Te30LzvGhYtptwZmTDlouTTNGsH9Cbmvjc6tA",
          "iss": "https://dev-49064111.okta.com/oauth2/default",
          "aud": "api://default",
          "iat": 1742058053,
          "exp": 1742061653,
          "cid": "0oanqcspi32WnZLw35d7",
          "uid": "00unqcssdvjHAx7Qg5d7",
          "scp": [
            "email",
            "profile",
            "openid"
          ],
          "auth_time": 1742058051,
          "sub": "testuser@email.com"
        }
         */
        Map<String, String> map = new HashMap<String,String>();

        for (String entry: entries){
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals(extraction)) {

                int remove = 1; //space after
                if (keyValue[1].endsWith("}")) remove = 2; // "sub": "testuser@email.com"}
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);
                map.put(keyValue[0], keyValue[1]);
            }
        }
        if(map.containsKey(extraction)){
            return map.get(extraction);
        }
        return null;

    }
}
