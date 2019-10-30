package com.example.demo.controller;

import com.example.demo.model.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
public class MainController {
    @Autowired
    private LectureService lectureService;

    @RequestMapping("/")
    public ModelAndView mainPage(Model model) {
        ModelAndView mav = new ModelAndView();
        Map<String, Object> map = lectureService.selectLectureList();

        mav.addObject("lectureList", map);
        mav.setViewName("main");

        return mav;
    }
}
