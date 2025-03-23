package hu.unideb.inf.virtualwardrobe.service.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    @NotBlank(message = "Email is required.")
    @Email(message = "Email should follow a valid format.")
    private String email;

    @NotBlank(message = "Password is required.")
    private String password;
}
