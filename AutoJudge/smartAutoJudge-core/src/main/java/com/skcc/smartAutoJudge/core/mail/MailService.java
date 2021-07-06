package com.skcc.smartAutoJudge.core.mail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailService {
	
	public void sendMail(String userId, String mailTitle, String letter) {
		
		final String Adminuser = "jst2677752@gmail.com"; //Admin 이메일 아이디 
		final String Adminpassword = "wjdxo84265!@"; //Admin 이메일의 패스워드

		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", 465); 
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.ssl.enable", "true"); 
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

		Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Adminuser, Adminpassword);
            }
        });
		
		
		 try {
	            MimeMessage message = new MimeMessage(session);
	            message.setFrom(new InternetAddress(Adminuser));

	            //수신자메일주소
	            message.addRecipient(Message.RecipientType.TO, new InternetAddress(userId)); 

	            // Subject
	            message.setSubject(mailTitle); //메일 제목을 입력

	            // Text
	            message.setText(letter);    //메일 내용을 입력

	            // send the message
	            Transport.send(message); ////전송

	        } catch (AddressException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        } catch (MessagingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
		
		
	}

}
