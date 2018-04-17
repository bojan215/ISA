package ftn.isa2018.model;

public class TempUser {

    private String email;
    private String password;

    public TempUser(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public TempUser() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
