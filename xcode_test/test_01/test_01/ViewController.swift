//
//  ViewController.swift
//  test_01
//
//  Created by Jae Moon on 10/16/18.
//  Copyright © 2018 Jae Moon. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label1: UILabel!
    
    
    @IBOutlet weak var num1: UITextField!
    @IBOutlet weak var num2: UITextField!
    @IBOutlet weak var result: UILabel!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        label1.isHidden = true
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func btn1(_ sender: AnyObject) {
        label1.text = "Jae Moon"
        label1.isHidden = false
    }

    @IBAction func reset(_ sender: AnyObject) {
        label1.text = ""
    }
    
    
    @IBAction func addBtn(_ sender: AnyObject) {
        
        var n1 = Double(num1.text!)
        var n2 = Double(num2.text!)
        
        if n1 == nil { n1 = 0 }
        if n2 == nil { n2 = 0 }
        
        
        let resultSum = Double(n1! + n2!)
        result.text = "Sum \(n1!) + \(n2!)  = \(resultSum)"
        
        
    }
    
    
    
    
}

