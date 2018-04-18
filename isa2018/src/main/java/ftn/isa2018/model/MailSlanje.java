package ftn.isa2018.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;



@Service
public class MailSlanje {
	/*
    private JavaMailSender javaMailSender;

    @Autowired
    public MailSlanje(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendMail(User user) throws MailException{
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(user.getEmail());
        //Napraviti mejl i uneti ga
        //simpleMailMessage.setFrom("");
        simpleMailMessage.setSubject("Aktiviranje naloga");

        String mailContent = " Za aktiviranje naloga idite na sledeci link : localhost:9100/#!/confirm \n\n";

        simpleMailMessage.setText(mailContent);
        //javaMailSender.send(simpleMailMessage);
    }

    @Async
    public void sendInvitationMail(Long id, User user) throws  MailException{
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(user.getEmail());
        //Napraviti mejl i uneti ga
        //simpleMailMessage.setFrom("");
        
        simpleMailMessage.setSubject("Invite");

        String mailContent = "Dobili ste pozivnicu! Potvrda na sledecem linku:  localhost:9100/#/invite/" + id.toString() +"/" + user.getId();
        simpleMailMessage.setText(mailContent);
        //javaMailSender.send(simpleMailMessage);
    }
    */
}
